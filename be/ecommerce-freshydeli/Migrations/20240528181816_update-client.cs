using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateclient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "Client",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "Client");
        }
    }
}
