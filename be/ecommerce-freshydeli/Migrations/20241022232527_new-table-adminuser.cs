using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class newtableadminuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                schema: "oss-ecommerce",
                table: "AdminUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                schema: "oss-ecommerce",
                table: "AdminUser");
        }
    }
}
